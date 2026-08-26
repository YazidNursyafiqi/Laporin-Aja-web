import uploadService from "../services/upload-service.js"
import { put } from "@vercel/blob"

export const uploadController = async (req , res) => {
    const username = req.cookies?.username || "Anonymous";

    try {
        let file = null;
        if (req.file) {  // ada file
            try {
                // Try Vercel blob upload with a short timeout hint if configured
                file = await put(`image/${Date.now()}-${username}.jpg`, req.file.buffer, {
                    access: "public",
                    contentType: req.file.mimetype
                });
            } catch (blobErr) {
                console.log("Vercel blob upload failed or token missing, using base64 fallback:", blobErr.message);
                const base64 = req.file.buffer.toString("base64");
                file = { url: `data:${req.file.mimetype};base64,${base64}` };
            }
        }

        await uploadService(req.body, file, username);

        return res.json({
            status: "Upload Berhasil!"
        });
    } catch(err) {
        console.log("Error uploading report:", err);
        return res.status(500).json({
            status: "server-error"
        });
    }
}