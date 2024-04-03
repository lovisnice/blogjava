export interface PostEntity {
    title: string;
    content: string;
    //createdAt: string; // Assuming createdAt is stored as a string, adjust as per your backend setup
    postImages: File[]; // Assuming PostImageEntity interface is defined elsewhere
}

export interface IUploadedFile {
    originFileObj: File
}
