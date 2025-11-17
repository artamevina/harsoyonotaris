import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faCalendarAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

// Fungsi untuk membuat slug dari judul
const createSlug = (judul) => {
    return judul
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
}

export default function ArticleCard({ article, darkMode = false }) {
    const displayDate = article.tanggal_update || article.tanggal_upload
    const displayTime = article.jam_update || article.jam_upload
    const isUpdated = !!article.tanggal_update
    const articleSlug = createSlug(article.judul)

    const optimizeCloudinaryImage = (url) => {
        if (url.includes('res.cloudinary.com')) {
            if (url.includes('?')) {
                return url.replace('/upload/', '/upload/f_auto,q_auto,w_800/')
            } else {
                return url.replace('/upload/', '/upload/f_auto,q_auto,w_800/')
            }
        }
        return url
    }

    const optimizedImageUrl = optimizeCloudinaryImage(article.gambar_url)

    return (
        <div
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-md overflow-hidden article-card hover:shadow-lg transition-shadow duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            data-aos="fade-up"
            data-aos-delay="100"
        >
            <Link to={`/articles/${articleSlug}`} className="block">
                <img
                    src={optimizedImageUrl}
                    alt={`Artikel Notaris Tegal - ${article.judul} - Layanan Notaris dan PPAT di Jawa Tengah`}
                    className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    onError={(e) => {
                        e.target.src = 'https://res.cloudinary.com/du4wegspv/image/upload/f_auto,q_auto,w_800/v1754958645/OIP_lrnn0v.jpg'
                    }}
                    loading="lazy"
                />
            </Link>
            <div className="p-6">
                <div className="flex flex-wrap items-center text-sm text-gray-400 mb-3 gap-2">
                    <span className={`${darkMode ? 'bg-gray-700 text-gold-400' : 'bg-blue-100 text-blue-800'} px-2 py-1 rounded-full text-xs`}>
                        {article.penulis || "Notaris Tegal"}
                    </span>
                    <span className={`${darkMode ? 'text-gray-600' : 'text-gray-300'} hidden sm:inline`}>•</span>
                    <span className="flex items-center">
                        {isUpdated ? (
                            <span className="flex items-center">
                                <FontAwesomeIcon icon={faSyncAlt} className="mr-1 text-xs" />
                                {displayDate}
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <FontAwesomeIcon icon={faCalendar} className="mr-1 text-xs" />
                                {displayDate}
                            </span>
                        )}
                    </span>
                </div>
                <Link to={`/articles/${articleSlug}`}>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white hover:text-gold-400' : 'text-gray-800 hover:text-blue-600'} mb-3 transition-colors line-clamp-2`}>
                        {article.judul}
                    </h3>
                </Link>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3`}>{article.deskripsi}</p>
                <div className="flex justify-between items-center">
                    <Link
                        to={`/articles/${articleSlug}`}
                        className={`${darkMode ? 'text-gold-500 hover:text-gold-400' : 'text-blue-600 hover:text-blue-800'} font-medium flex items-center transition-colors group`}
                    >
                        Baca Selengkapnya
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className={`ml-2 text-sm transition-transform group-hover:translate-x-1 ${darkMode ? 'text-gold-400' : ''}`}
                        />
                    </Link>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <span className="text-xs text-gray-500">
                        Layanan Notaris dan PPAT Tegal, Jawa Tengah
                    </span>
                </div>
            </div>
        </div>
    )
}