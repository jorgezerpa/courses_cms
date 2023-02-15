"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getFile = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_1 = __importDefault(require("../../config"));
const fs_1 = __importDefault(require("fs"));
const client = new client_s3_1.S3Client({
    region: config_1.default.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: config_1.default.AWS_ACCESS_KEY,
        secretAccessKey: config_1.default.AWS_SECRET_ACCESS_KEY,
    },
});
/* ---------------------------------------------
                HANDLE BUCKETS
   -------------------------------------------- */
//function called when create a new user
// export async function createBucket(user:User){
//     const bucketName = user.s3Identifier as string + "-" + Date.now();
//     const command = new CreateBucketCommand({ Bucket: bucketName })
//     const result = await client.send(command)
//     return { bucketName, result }
// }
/* ---------------------------------------------
                HANDLE BUCKETS' FILES
   -------------------------------------------- */
function uploadFile(bucketname, file, extension) {
    return __awaiter(this, void 0, void 0, function* () {
        const stream = fs_1.default.createReadStream(file);
        const key = bucketname + Math.random() * 10000 + file + '.' + extension;
        const uploadParams = {
            Bucket: bucketname,
            Key: key,
            Body: stream
        };
        const command = new client_s3_1.PutObjectCommand(uploadParams);
        const result = yield client.send(command);
        return { key: key };
    });
}
exports.uploadFile = uploadFile;
//TODO --> IMPLEMENT THIS FOR FETCH JUST VIDEOS OR JUST RESOURCES --> USE TAGS?
// export async function getFiles(bucketName:string, fileKey:string){
//     const command = new ListObjectsCommand({
//         Bucket: bucketName,
//     })   
//     const result = await client.send(command)
//     return result
// }
function getFile(bucketName, fileKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
        });
        const fileMetadata = yield client.send(command);
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 3600 });
        return { url: url, metadata: fileMetadata.$metadata };
    });
}
exports.getFile = getFile;
function deleteFile(bucketName, fileKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
        });
        const result = yield client.send(command);
        return result;
    });
}
exports.deleteFile = deleteFile;
