export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'portofolio-notaris')

    try {
        const response = await fetch(
            'https://api.cloudinary.com/v1_1/du4wegspv/image/upload',
            {
                method: 'POST',
                body: formData
            }
        )

        const data = await response.json()
        return data.secure_url
    } catch (error) {
        console.error('Error uploading image:', error)
        throw error
    }
}