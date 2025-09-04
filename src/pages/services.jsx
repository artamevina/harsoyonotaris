import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'

export default function Services() {
    return (
        <>
            <Header />
            <Breadcrumb />
            <div className="bg-gray-900 text-white pt-24 pb-16" data-aos="fade-right">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Layanan Notaris dan PPAT di Tegal, Jawa Tengah</h1>
                    <p className="text-gray-300 mb-8">Kantor Notaris dan PPAT Harsoyo menyediakan berbagai layanan hukum profesional untuk masyarakat Tegal dan Jawa Tengah.</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-gold-500 mb-4">Layanan Notaris</h2>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Pembuatan Akta Notaris</li>
                                <li>Legalisasi Dokumen</li>
                                <li>Pendirian PT dan Badan Usaha</li>
                                <li>Pembuatan Surat Wasiat</li>
                                <li>Perjanjian Kontrak</li>
                            </ul>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-gold-500 mb-4">Layanan PPAT</h2>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Pengurusan Sertifikat Tanah</li>
                                <li>Peralihan Hak atas Tanah</li>
                                <li>Pendaftaran Hak Tanggungan</li>
                                <li>Pembuatan Akta Jual Beli</li>
                                <li>Pembebanan Hak Tanggungan</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-6">Mengapa Memilih Notaris dan PPAT Harsoyo di Tegal?</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="bg-gold-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-clock text-gray-900 text-xl"></i>
                                </div>
                                <h3 className="font-semibold mb-2">Proses Cepat</h3>
                                <p className="text-gray-300 text-sm">Layanan notaris dan ppat yang efisien dengan proses yang cepat</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-gold-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-shield-alt text-gray-900 text-xl"></i>
                                </div>
                                <h3 className="font-semibold mb-2">Terpercaya</h3>
                                <p className="text-gray-300 text-sm">Sebagai notaris dan ppat tegal terpercaya dengan pengalaman</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-gold-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-map-marker-alt text-gray-900 text-xl"></i>
                                </div>
                                <h3 className="font-semibold mb-2">Lokasi Strategis</h3>
                                <p className="text-gray-300 text-sm">Kantor notaris dan ppat yang mudah diakses di Tegal, Jawa Tengah</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}