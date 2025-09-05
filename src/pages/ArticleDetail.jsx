import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import 'react-quill-new/dist/quill.snow.css';
import { Loading } from '../components/Template';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';

export default function ArticleDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

                setArticle(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchArticle()
    }, [id])

    const handleDelete = async () => {
        if (!user) return

        if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            try {
                const { error } = await supabase
                    .from('artikel')
                    .delete()
                    .eq('id', id)

                if (error) throw error

                navigate('/articles', { state: { message: 'Artikel berhasil dihapus' } })
            } catch (error) {
                setError(error.message)
            }
        }
    }

    if (loading) return <div className="p-4 bg-gray-900">
        <Loading />
    </div>
    if (error) return <div className="p-4 text-red-400 bg-gray-900">{error}</div>
    if (!article) return <div className="p-4 text-gray-300 bg-gray-900">Artikel tidak ditemukan</div>

    return (
        <>
            <Header />
            <Breadcrumb />

            <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center" data-aos="fade-up">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Detail Artikel Notaris Tegal</h1>
                        <div className="w-20 h-1 bg-gold-500 mx-auto mb-6"></div>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Informasi lengkap artikel hukum dari Notaris & PPAT Harsoyo di Tegal, Jawa Tengah
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex justify-start">
                        <button
                            onClick={() => navigate("/articles")}
                            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all flex items-center"
                        >
                            <i className="fas fa-arrow-left mr-2"></i> Kembali ke Artikel
                        </button>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">{article.judul}</h1>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                            <div className="flex flex-wrap items-center gap-4 text-gray-400">
                                <span className="flex items-center">
                                    <i className="fas fa-user-edit mr-2"></i> {article.penulis}
                                </span>
                                <span
                                    className="flex items-center cursor-help"
                                    title={article.tanggal_update ?
                                        `Diposting: ${article.tanggal_upload} ${article.jam_upload || ''}\nDiperbarui: ${article.tanggal_update} ${article.jam_update || ''}` :
                                        `Diposting: ${article.tanggal_upload} ${article.jam_upload || ''}`}
                                >
                                    <i className="far fa-calendar-alt mr-2"></i>
                                    {article.tanggal_update ? 'Diperbarui: ' : 'Diposting: '}
                                    {article.tanggal_update || article.tanggal_upload}
                                    {(article.jam_update || article.jam_upload) && (
                                        <>
                                            {' '}<i className="far fa-clock ml-2 mr-1"></i>
                                            {article.jam_update || article.jam_upload}
                                        </>
                                    )}
                                </span>
                            </div>

                            {user && (
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => navigate(`/articles/edit/${article.id}`)}
                                        className="px-4 py-2 bg-gold-500 text-gray-900 rounded-lg hover:bg-gold-600 transition-all flex items-center font-medium"
                                    >
                                        <i className="fas fa-edit mr-2"></i> Edit
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center"
                                    >
                                        <i className="fas fa-trash mr-2"></i> Hapus
                                    </button>
                                </div>
                            )}
                        </div>

                        {article.gambar_url && (
                            <div className="mb-8 rounded-xl overflow-hidden border border-gray-700">
                                <img
                                    src={article.gambar_url}
                                    alt={`Artikel Notaris Tegal - ${article.judul}`}
                                    className="w-full h-auto rounded-lg"
                                />
                                <p className="text-sm text-gray-500 mt-2 text-center">
                                    Gambar ilustrasi artikel {article.judul} - Notaris dan PPAT Tegal
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <p className="text-lg text-gray-300 font-medium">{article.deskripsi}</p>
                    </div>

                    <div className="prose max-w-none text-gray-300">
                        <div
                            className="ql-editor p-0 prose-invert"
                            dangerouslySetInnerHTML={{ __html: article.isi }}
                        />
                    </div>

                    <div className="mt-12 p-6 bg-gray-700 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-4">Tentang Penulis</h3>
                        <p className="text-gray-300">
                            Artikel ini ditulis oleh <strong>Harsoyo, S.IP, SH., MKn</strong>, Notaris dan PPAT berlisensi
                            yang berkantor di Tegal, Jawa Tengah. Sejak tahun 2023, beliau telah melayani
                            berbagai kebutuhan hukum termasuk jasa notaris, PPAT, pengurusan sertifikat tanah, dan konsultasi
                            hukum untuk masyarakat Tegal dan sekitarnya.
                        </p>
                        <p className="text-gray-300 mt-2">
                            Untuk konsultasi dengan Notaris dan PPAT di Tegal, hubungi kami di telepon
                            <strong> 085712269000</strong> atau <strong>085742419333</strong>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}