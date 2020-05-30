import axios from "axios"
import {toMB} from "@/filter/index"

import router from "@/router/index"

/* ENUM or Stucture
   "blobs": { "type_1": { blob: [], urls: [], uploadId: "", s3Path: "", fileName: "", folderName: "", fileType: "" } }
   "projectConfig": { filename: "", folder_name: "" } */

export default {
    "state": {
        "blobs": {},
        "projectConfig": {}
    },
    "mutations": {
        blobs (state, payload) {

            state.blobs[payload.kind] = {
                "blob": payload.blob
            }

        },
        presignedUrls (state, payload) {

            let obj = {
                "urls": payload.urls,
                "uploadId": payload.uploadId,
                "s3Path": payload.s3Path,
                "fileName": payload.fileName,
                "folderName": payload.folderName,
                "fileType": payload.fileType
            }
            state.blobs[payload.kind] = {
                ...state.blobs[payload.kind],
                ...obj
            }

        },
        projectConfig (state, payload) {

            state.projectConfig = payload

        }
    },
    "actions": {
        createBlob ({commit}, payload) {

            let lastPart = function (val) {

                    let size = toMB(val),
                        lastChunkSize = 0

                    if (size % 5) {

                        lastChunkSize = size % 5

                    }

                    return lastChunkSize

                },
                calculateParts = function (val) {

                    let size = toMB(val),
                        chunks = 1

                    if (size > navigator.connection.downlink) {

                        chunks = Math.ceil(size / navigator.connection.downlink)

                    }

                    return chunks

                },
                size = parseInt(calculateParts(payload.size), 10),
                arr = []
            for (let i = 0; i < size; i++) {

                let chunk

                if (i !== size - 1) {

                    chunk = payload.slice(i, i + navigator.connection.downlink * 1000000)

                } else {

                    chunk = payload.slice(i, i + lastPart(payload.size) * 1000000)

                }
                arr.push(chunk)

            }

            commit("blobs", {
                "kind": payload.fileType,
                "blob": arr
            })

        },
        readPresignedUrls ({commit, dispatch, rootState}, payload) {

            axios.get(rootState.apiBase, {
                "params": {
                    "op_type": "GET_MULTIPART_PRESIGNED_URLS",
                    "total_parts": payload.blob.length,
                    "config": {
                        "filename": payload.fileName,
                        "folder_name": payload.folderName,
                        "file_type": payload.fileType
                    },
                    "auth_token": sessionStorage.getItem("jwt")
                }
            }).
                then(response => {

                    return response.data

                }).
                then(response => {

                    commit("presignedUrls", {
                        "kind": payload.fileKind,
                        "urls": response.parts,
                        "uploadId": response.upload_id,
                        "s3Path": response.s3_path,
                        "fileName": payload.fileName,
                        "folderName": payload.folderName,
                        "fileType": payload.fileType
                    })

                }).
                catch(error => {

                    dispatch("loader", false)
                    return error

                })

        },
        updateBlob ({dispatch, state}, payload) {

            if (!payload.blob.length) {

                dispatch("updateFile", payload)
                Object.values(state.blobs).forEach((val, i) => {

                    if (val.blob.length === 0 && i === Object.keys(state.blobs).length - 1) {

                        dispatch("updateConfig")

                    }

                })

            }

            const chunk = payload.blob.pop(),
                url = payload.urls.pop()

            let options = {
                "headers": {
                    "Content-Type": chunk.type
                }
            }
            delete axios.defaults.headers.common.Authorization
            axios.put(url, chunk, options).
                then(() => {

                    axios.defaults.headers.common.Authorization = sessionStorage.getItem("jwt")
                    dispatch("updateBlob", payload)

                }).
                catch(() => {

                    payload.blob.push(chunk)
                    payload.urls.push(url)

                })

        },
        updateFile ({dispatch, rootState}, payload) {

            axios.get(rootState.apiBase, {
                "params": {
                    "op_type": "COMPLETE_MULTIPART_UPLOAD",
                    "config": {
                        "upload_id": payload.uploadId,
                        "filename": payload.fileName,
                        "folder_name": payload.folderName,
                        "s3_path": payload.s3Path
                    },
                    "auth_token": sessionStorage.getItem("jwt")
                }
            }).
                catch(() => {

                    let notification = {
                        "id": rootState.utility.notifications.length++,
                        "active": true,
                        "type": "toast-error",
                        "title": "Something went wrong!!",
                        "description": "Failed to complete multipart upload"
                    }
                    dispatch("notifications", [
                        notification,
                        "push"
                    ])
                    dispatch("loader", false)

                })

        },
        updateConfig ({dispatch, state, rootState}) {

            axios.get(rootState.apiBase, {
                "params": {
                    "config": JSON.stringify(state.projectConfig).replace("\\r", ""),
                    "op_type": "WRITE_FILE",
                    "auth_token": sessionStorage.getItem("jwt")
                }
            }).
                then((response) => {

                    if (response.data === "File Upload Failed") {

                        let notification = {
                            "id": rootState.utility.notifications.length++,
                            "active": true,
                            "type": "toast-error",
                            "title": "Something went wrong!!",
                            "description": "Failed to upload configuration file."
                        }
                        dispatch("notifications", [
                            notification,
                            "push"
                        ])
                        dispatch("loader", false)

                    } else {

                        let notification = {
                            "id": rootState.utility.notifications.length++,
                            "active": true,
                            "type": "toast-success",
                            "title": "Upload Successful",
                            "description": "Configuration was successfully stored to server."
                        }
                        dispatch("notifications", [
                            notification,
                            "push"
                        ])
                        setTimeout(() => {

                            notification = {
                                "id": rootState.utility.notifications.length++,
                                "active": true,
                                "type": "toast-warning",
                                "title": "Processing Data",
                                "description": `Analysing ${ state.projectConfig.filename } project datasets and generating insights. Insights will be available in few mins.`,
                                "duration": 1
                            }
                            dispatch("notifications", [
                                notification,
                                "push"
                            ])
                            let processingFile = {"filename": state.projectConfig.filename,
                                "project": state.projectConfig.folder_name,
                                "notificationId": rootState.utility.notifications.length++ - 1}
                            dispatch("processingData", [
                                processingFile,
                                "push"
                            ])
                            router.push({"name": "initInsight"})
                            dispatch("loader", false)

                        }, 10000)

                    }

                }).
                catch(() => {

                    let notification = {
                        "id": rootState.utility.notifications.length++,
                        "active": true,
                        "type": "toast-error",
                        "title": "Something went wrong!!",
                        "description": "Failed to upload configuration file."
                    }
                    dispatch("notifications", [
                        notification,
                        "push"
                    ])
                    dispatch("loader", false)

                })

        }
    },
    "getters": {
        "blobs": state => state.blobs,
        "projectConfig": state => state.projectConfig
    }
}
