import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { supabase } from '../services/supabase'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { SectionHeader } from './Template'

export default function EditArticleForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        judul: '',
        deskripsi: '',
        isi: '',
        gambar: null,
        penulis: ''
    })
    const [isUploading, setIsUploading] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const [error, setError] = useState(null)
    const [currentImageUrl, setCurrentImageUrl] = useState('')

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'list',
        'color', 'background',
        'align',
        'link', 'image'
    ]

    const getCurrentIndonesiaTime = () => {
        const now = new Date()
        const offset = 7 * 60 * 60 * 1000
        const indonesiaTime = new Date(now.getTime() + offset)

        return {
            date: indonesiaTime.toISOString().split('T')[0],
            time: indonesiaTime.toISOString().split('T')[1].split('.')[0]
        }
    }

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const { data, error } = await supabase
                    .from('artikel')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                if (!data) throw new Error('Artikel tidak ditemukan')

                setFormData({
                    judul: data.judul,
                    deskripsi: data.deskripsi,
                    isi: data.isi,
                    gambar: null,
                    penulis: data.penulis || ''
                })
                setCurrentImageUrl(data.gambar_url || '')
            } catch (error) {
                setError(error.message)
            }
        }

        fetchArticle()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setError(null)
    }

    const handleContentChange = (content) => {
        setFormData(prev => ({ ...prev, isi: content }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (!file.type.match('image.*')) {
                setError('File harus berupa gambar')
                return
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Ukuran gambar maksimal 5MB')
                return
            }

            setFormData(prev => ({ ...prev, gambar: file }))
            setError(null)

            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsUploading(true)
        setError(null)

        try {
            let imageUrl = currentImageUrl

            if (formData.gambar) {
                const cloudName = 'du4wegspv'
                const uploadPreset = 'portofolio-notaris'

                const formDataImg = new FormData()
                formDataImg.append('file', formData.gambar)
                formDataImg.append('upload_preset', uploadPreset)

                const uploadResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    formDataImg,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (!uploadResponse.data.secure_url) {
                    throw new Error('Gagal mengunggah gambar ke Cloudinary')
                }

                imageUrl = uploadResponse.data.secure_url
            }

            if (!formData.judul || !formData.deskripsi || !formData.isi) {
                throw new Error('Judul, deskripsi, dan isi artikel harus diisi')
            }

            const indonesiaTime = getCurrentIndonesiaTime()

            const { data, error: supabaseError } = await supabase
                .from('artikel')
                .update({
                    judul: formData.judul,
                    deskripsi: formData.deskripsi,
                    isi: formData.isi,
                    gambar_url: imageUrl || null,
                    penulis: formData.penulis || 'DR. Jaenudin Umar, SE, SH. M.Kn',
                    tanggal_update: indonesiaTime.date,
                    jam_update: indonesiaTime.time
                })
                .eq('id', id)
                .select()

            if (supabaseError) throw supabaseError

            if (!data || data.length === 0) {
                throw new Error('Gagal memperbarui artikel')
            }

            navigate(`/articles/${id}`, { state: { message: 'Artikel berhasil diperbarui' } })

        } catch (error) {
            console.error('Error updating article:', error)
            setError(error.message || 'Terjadi kesalahan saat memperbarui artikel')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <SectionHeader
                title="Edit Artikel"
                description="Perbarui artikel untuk ditampilkan di website"
                darkMode={true}
            />

            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700 max-w-4xl mx-auto">
                {error && (
                    <div className="mb-4 p-4 bg-red-900 text-red-100 rounded-md">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-300 mb-2 font-medium" htmlFor="judul">Judul Artikel</label>
                    <input
                        type="text"
                        id="judul"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                        placeholder="Masukkan judul artikel"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 mb-2 font-medium" htmlFor="penulis">Nama Penulis</label>
                    <input
                        type="text"
                        id="penulis"
                        name="penulis"
                        value={formData.penulis}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="DR. Jaenudin Umar, SE, SH. M.Kn - Notaris Cirebon"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 mb-2 font-medium" htmlFor="deskripsi">Deskripsi Singkat</label>
                    <textarea
                        id="deskripsi"
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                        placeholder="Masukkan deskripsi singkat artikel"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 mb-2 font-medium">Isi Artikel</label>
                    <div className="sticky top-0 z-10 bg-gray-800 text-white">
                        <ReactQuill
                            theme="snow"
                            value={formData.isi}
                            onChange={handleContentChange}
                            modules={modules}
                            formats={formats}
                            placeholder="Tulis isi artikel di sini..."
                            className="h-90 text-white [&_.ql-editor]:min-h-[200px] [&_.ql-editor]:text-gray-200 [&_.ql-editor]:font-sans [&_.ql-editor]:leading-relaxed"
                            style={{
                                '--ql-editor-background': '#1f2937',
                                '--ql-toolbar-background': '#111827',
                                '--ql-border-color': '#374151',
                                '--ql-tooltip-color': '#e5e7eb',
                                '--ql-tooltip-background': '#1f2937',
                                '--ql-tooltip-border': '#374151'
                            }}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 mb-2 font-medium" htmlFor="gambar">
                        Gambar Artikel
                    </label>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <input
                                type="file"
                                id="gambar"
                                name="gambar"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                            />
                        </div>
                        {previewImage ? (
                            <div className="flex-shrink-0">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="h-16 w-16 object-cover rounded-md border border-gray-200"
                                />
                            </div>
                        ) : currentImageUrl ? (
                            <div className="flex-shrink-0">
                                <img
                                    src={currentImageUrl}
                                    alt="Current"
                                    className="h-16 w-16 object-cover rounded-md border border-gray-200"
                                />
                            </div>
                        ) : null}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        Format: JPG, PNG (Maksimal 5MB)
                    </p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={isUploading}
                        className="px-6 py-2 bg-yellow-600 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-bold"
                    >
                        {isUploading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Simpan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}