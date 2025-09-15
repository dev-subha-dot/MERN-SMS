import multer from "multer";
import path from "path";

const uploadDir = path.join(process.cwd(), "src", "Uploads"); // File Path Location

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // folder where files will be saved
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname.replace(/\s+/g, "_"); // replace spaces
        cb(null, `${timestamp}_${originalName}`);
    }
});

// File filter (optional - allow only images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpeg, .jpg, .png, .pdf files are allowed"));
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
