import { useState } from 'react'
import axios from 'axios'
import { supabase } from '../services/supabase'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'

const createSlug = (judul) => {
    return judul
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
}

export default function ArticleForm({ onArticleAdded }) {
    const [formData, setFormData] = useState({
        judul: '',
        deskripsi: '',
        isi: '',
        gambar: null,
        penulis: 'Harsoyo, S.IP, SH.'
    })
    const [isUploading, setIsUploading] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const [error, setError] = useState(null)

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
    ];

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

    const getCurrentIndonesiaTime = () => {
        const now = new Date()
        const offset = 7 * 60 * 60 * 1000
        const indonesiaTime = new Date(now.getTime() + offset)

        return {
            date: indonesiaTime.toISOString().split('T')[0],
            time: indonesiaTime.toISOString().split('T')[1].split('.')[0]
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsUploading(true)
        setError(null)

        try {
            let imageUrl = ''
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

            const indonesiaTime = getCurrentIndonesiaTime()
            const articleData = {
                judul: formData.judul,
                deskripsi: formData.deskripsi,
                isi: formData.isi,
                gambar_url: imageUrl || null,
                tanggal_upload: indonesiaTime.date,
                jam_upload: indonesiaTime.time,
                penulis: formData.penulis || 'Harsoyo, S.IP, SH.'
            }

            if (!articleData.judul || !articleData.deskripsi || !articleData.isi) {
                throw new Error('Judul, deskripsi, dan isi artikel harus diisi')
            }

            const { data, error: supabaseError } = await supabase
                .from('artikel')
                .insert([articleData])
                .select()

            if (supabaseError) throw supabaseError

            if (!data || data.length === 0) {
                throw new Error('Gagal menyimpan artikel')
            }

            setFormData({
                judul: '',
                deskripsi: '',
                isi: '',
                gambar: null,
                penulis: 'Harsoyo, S.IP, SH.'
            })
            setPreviewImage(null)

            const articleWithSlug = {
                ...data[0],
                slug: createSlug(formData.judul)
            }

            onArticleAdded(articleWithSlug)

        } catch (error) {
            console.error('Error uploading article:', error)
            setError(error.message || 'Terjadi kesalahan saat mengunggah artikel')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Tambah Artikel Baru</h2>

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
                    placeholder="Masukkan judul artikel (Contoh: Jasa Notaris Tegal Terbaik)"
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
                    placeholder="Harsoyo, S.IP, SH."
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
                            required
                        />
                    </div>
                    {previewImage && (
                        <div className="flex-shrink-0">
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="h-16 w-16 object-cover rounded-md border border-gray-200"
                            />
                        </div>
                    )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                    Format: JPG, PNG (Maksimal 5MB)
                </p>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isUploading}
                    className="px-6 py-2 bg-yellow-600 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-bold"
                >
                    {isUploading ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin h-5 w-5" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
                            Simpan Artikel
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}