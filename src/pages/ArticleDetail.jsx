import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import 'react-quill-new/dist/quill.snow.css';
import { Loading } from '../components/Template';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import SEOHead from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faUserEdit,
    faEdit,
    faTrash,
    faUser
} from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faClock as faClockRegular } from '@fortawesome/free-regular-svg-icons'

const createSlug = (judul) => {
    return judul
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
}

export default function ArticleDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const breadcrumbItems = [
        { label: "Beranda", url: "/" },
        { label: "Artikel", url: "/articles" },
        { label: article?.judul || "Detail Artikel", url: `/articles/${slug}` }
    ];

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const { data: articles, error } = await supabase
                    .from('artikel')
                    .select('*')
                    .order('tanggal_update', { ascending: false, nullsFirst: false })
                    .order('tanggal_upload', { ascending: false })

                if (error) throw error

                const foundArticle = articles.find(article =>
                    createSlug(article.judul) === slug
                )

                if (!foundArticle) throw new Error('Artikel tidak ditemukan')

                setArticle(foundArticle)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchArticle()
    }, [slug])

    const handleDelete = async () => {
        if (!user) return

        if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            try {
                const { error } = await supabase
                    .from('artikel')
                    .delete()
                    .eq('id', article.id)

                if (error) throw error

                navigate('/articles', { state: { message: 'Artikel berhasil dihapus' } })
            } catch (error) {
                setError(error.message)
            }
        }
    }

    const generateArticleSchema = () => {
        if (!article) return null;

        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.judul,
            "description": article.deskripsi,
            "image": article.gambar_url ? [article.gambar_url] : [],
            "datePublished": article.tanggal_upload,
            "dateModified": article.tanggal_update || article.tanggal_upload,
            "author": {
                "@type": "Person",
                "name": article.penulis || "Harsoyo, S.IP, SH., MKn",
                "jobTitle": "Notaris dan PPAT"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Kantor Notaris dan PPAT Harsoyo",
                "url": "https://harsoyonotarisppat.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://harsoyonotarisppat.com/android-chrome-512x512.png"
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://harsoyonotarisppat.com/articles/${slug}`
            }
        };
    }

    if (loading) return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <div className="pt-24">
                <Loading />
            </div>
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <div className="pt-24 text-red-400 text-center p-8">
                {error}
            </div>
        </div>
    )

    if (!article) return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <div className="pt-24 text-gray-300 text-center p-8">
                Artikel tidak ditemukan
            </div>
        </div>
    )

    return (
        <>
            <SEOHead
                title={`${article.judul} - Notaris & PPAT Harsoyo Tegal`}
                description={article.deskripsi || `Artikel tentang ${article.judul} oleh Notaris dan PPAT Harsoyo di Tegal, Jawa Tengah. Dapatkan informasi hukum terkini dari notaris profesional.`}
                keywords={`${article.judul}, notaris tegal, ppat tegal, artikel hukum, konsultasi hukum jawa tengah, harsoyo notaris`}
                canonicalUrl={`https://harsoyonotarisppat.com/articles/${slug}`}
            />

            <script type="application/ld+json">
                {JSON.stringify(generateArticleSchema())}
            </script>

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Beranda",
                            "item": "https://harsoyonotarisppat.com"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Artikel",
                            "item": "https://harsoyonotarisppat.com/articles"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": article.judul,
                            "item": `https://harsoyonotarisppat.com/articles/${slug}`
                        }
                    ]
                })}
            </script>

            <Header />
            <Breadcrumb items={breadcrumbItems} />

            <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center" data-aos="fade-up">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Artikel Notaris & PPAT Tegal</h1>
                        <div className="w-20 h-1 bg-gold-500 mx-auto mb-6"></div>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Informasi hukum terkini dari Notaris & PPAT Harsoyo di Tegal, Jawa Tengah
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-800 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex justify-start">
                        <button
                            onClick={() => navigate("/articles")}
                            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2 font-medium"
                            aria-label="Kembali ke halaman artikel"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Kembali ke Daftar Artikel
                        </button>
                    </div>

                    <article className="bg-gray-900 rounded-xl p-8 mb-8 border border-gray-700">
                        <header className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                {article.judul}
                            </h1>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm md:text-base">
                                    <span className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                                        <FontAwesomeIcon icon={faUserEdit} className="text-gold-500" />
                                        {article.penulis || "Harsoyo, S.IP, SH., MKn"}
                                    </span>
                                    <span
                                        className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full cursor-help"
                                        title={article.tanggal_update ?
                                            `Diposting: ${article.tanggal_upload} ${article.jam_upload || ''}\nDiperbarui: ${article.tanggal_update} ${article.jam_update || ''}` :
                                            `Diposting: ${article.tanggal_upload} ${article.jam_upload || ''}`}
                                    >
                                        <FontAwesomeIcon icon={faCalendar} className="text-gold-500" />
                                        {article.tanggal_update ? 'Diperbarui: ' : 'Diposting: '}
                                        {article.tanggal_update || article.tanggal_upload}
                                        {(article.jam_update || article.jam_upload) && (
                                            <>
                                                {' '}
                                                <FontAwesomeIcon icon={faClockRegular} className="ml-2" />
                                                {article.jam_update || article.jam_upload}
                                            </>
                                        )}
                                    </span>
                                </div>

                                {user && (
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => navigate(`/articles/edit/${article.id}`)}
                                            className="px-4 py-2 bg-gold-500 text-gray-900 rounded-lg hover:bg-gold-600 transition-all flex items-center gap-2 font-medium text-sm md:text-base"
                                            aria-label={`Edit artikel ${article.judul}`}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                            Edit Artikel
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center gap-2 text-sm md:text-base"
                                            aria-label={`Hapus artikel ${article.judul}`}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            Hapus
                                        </button>
                                    </div>
                                )}
                            </div>

                            {article.gambar_url && (
                                <div className="mb-6 rounded-xl overflow-hidden border border-gray-700">
                                    <img
                                        src={article.gambar_url}
                                        alt={`Artikel Notaris Tegal - ${article.judul}`}
                                        className="w-full h-auto max-h-96 object-cover"
                                        loading="lazy"
                                    />
                                    <p className="text-sm text-gray-500 mt-2 text-center">
                                        Ilustrasi artikel {article.judul} - Notaris dan PPAT Harsoyo Tegal
                                    </p>
                                </div>
                            )}
                        </header>

                        {article.deskripsi && (
                            <div className="mb-8 p-4 bg-gray-800 rounded-lg border-l-4 border-gold-500">
                                <p className="text-lg text-gray-300 font-medium italic">
                                    {article.deskripsi}
                                </p>
                            </div>
                        )}

                        <div className="prose prose-lg max-w-none">
                            <div
                                className="ql-editor p-0 prose-invert prose-headings:text-white prose-strong:text-white prose-em:text-gray-300 prose-li:text-gray-300 prose-p:text-gray-300"
                                dangerouslySetInnerHTML={{ __html: article.isi }}
                            />
                        </div>
                    </article>

                    <div className="mt-12 p-8 bg-gray-900 rounded-xl border border-gray-700">
                        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faUser} className="text-gray-900" />
                            </div>
                            Tentang Penulis - Notaris & PPAT Tegal
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-300 mb-4">
                                    <strong className="text-gold-500">Harsoyo, S.IP, SH., MKn</strong> adalah Notaris dan PPAT berlisensi
                                    yang berkantor di Tegal, Jawa Tengah. Sejak tahun 2023, beliau telah melayani
                                    berbagai kebutuhan hukum masyarakat Tegal dan sekitarnya dengan profesionalisme tinggi.
                                </p>
                                <p className="text-gray-300">
                                    Spesialisasi layanan meliputi jasa notaris, PPAT, pengurusan sertifikat tanah,
                                    pendirian badan usaha, dan konsultasi hukum komprehensif.
                                </p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="font-semibold text-gold-500 mb-3">Kontak Notaris Tegal</h4>
                                <p className="text-gray-300 mb-2">
                                    📞 <strong>Telepon:</strong> 0857-4224-1933
                                </p>
                                <p className="text-gray-300 mb-2">
                                    📍 <strong>Alamat:</strong> JL. Hasyim Dirjo Subroto Desa Wangandawa, Talang, Tegal
                                </p>
                                <p className="text-gray-300">
                                    ⏰ <strong>Jam Layanan:</strong> Senin - Jumat, 08:00 - 16:00 WIB
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://wa.me/6285742419333"
                                className="bg-gold-500 text-gray-900 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gold-600 transition duration-300 flex-1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Konsultasi via WhatsApp
                            </a>
                            <a
                                href="tel:+6285742419333"
                                className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-600 transition duration-300 flex-1"
                            >
                                Telepon Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}