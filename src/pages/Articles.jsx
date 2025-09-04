import { useState, useEffect } from 'react'
import ArticleCard from '../components/ArticleCard'
import ArticleForm from '../components/ArticleForm'
import { supabase } from '../services/supabase'
import { Loading, SectionHeader } from '../components/Template'
import Header from '../components/Header'
import { useAuth } from '../components/AuthContext'
import Breadcrumb from '../components/Breadcrumb'

export default function Articles() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        fetchArticles()
    }, [])

    const fetchArticles = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('artikel')
                .select('*')
                .order('tanggal_update', { ascending: false, nullsFirst: false })
                .order('tanggal_upload', { ascending: false })

            if (error) throw error

            setArticles(data || [])
        } catch (error) {
            console.error('Error fetching articles:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddArticle = (newArticle) => {
        setArticles(prev => [newArticle, ...prev])
        setShowForm(false)
    }

    return (
        <>
            <Header />
            <Breadcrumb />
            <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-900">
                <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-900">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeader
                            title={"Artikel Hukum & Notaris Tegal, Jawa Tengah"}
                            description={"Kumpulan artikel informatif tentang hukum, notaris, dan PPAT untuk membantu Anda memahami berbagai aspek legal di wilayah Tegal dan Jawa Tengah. Dapatkan informasi terbaru tentang jasa notaris, ppat, pengurusan sertifikat tanah, dan layanan hukum lainnya."}
                            darkMode={true}
                        />
                    </div>
                </section>

                <div className="flex justify-between items-center mb-6 md:mb-8">
                    <h1 className="text-xl md:text-3xl font-bold text-white" data-aos="fade-up">
                        Artikel Notaris & PPAT Tegal, Jawa Tengah
                    </h1>
                    {user && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="flex items-center justify-center gap-2 p-2 md:px-4 md:py-2 bg-gold-500 text-gray-900 rounded-full md:rounded-lg hover:bg-gold-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                            data-aos="fade-up"
                            aria-label={showForm ? 'Batal tambah artikel' : 'Tambah artikel'}
                        >
                            {showForm ? (
                                <>
                                    <span className="hidden md:inline">Tutup</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    <span className="hidden md:inline">Tambah Artikel</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className="mb-8 md:mb-12" data-aos="fade-up">
                        <ArticleForm onArticleAdded={handleAddArticle} darkMode={true} />
                    </div>
                )}

                {loading ? (
                    <Loading />
                ) : articles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400">Belum ada artikel yang tersedia.</p>
                        <p className="text-gray-500 text-sm mt-2">Notaris dan PPAT Harsoyo di Tegal akan segera menambahkan artikel tentang layanan notaris, ppat, dan hukum.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} darkMode={true} />
                        ))}
                    </div>
                )}

                {/* Informasi tambahan untuk SEO */}
                <div className="mt-12 p-6 bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-bold text-white mb-4">Notaris dan PPAT Profesional di Tegal</h2>
                    <p className="text-gray-300 mb-4">
                        Harsoyo, S.IP, SH., MKn adalah Notaris dan PPAT berlisensi yang melayani wilayah Tegal dan Jawa Tengah.
                        Dengan pengalaman lebih dari 2 tahun, kami menyediakan berbagai layanan hukum profesional termasuk:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Jasa Notaris Tegal untuk pembuatan akta otentik</li>
                        <li>Layanan PPAT Tegal untuk pengurusan sertifikat tanah</li>
                        <li>Konsultasi hukum untuk masyarakat Jawa Tengah</li>
                        <li>Legalisasi dokumen dan surat-surat penting</li>
                        <li>Pendirian badan usaha dan perusahaan</li>
                    </ul>
                    <p className="text-gray-300 mt-4">
                        Hubungi kami di kantor Notaris dan PPAT Harsoyo di Tegal untuk konsultasi lebih lanjut.
                    </p>
                </div>
            </div>
        </>
    )
}