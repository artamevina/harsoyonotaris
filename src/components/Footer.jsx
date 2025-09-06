export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl font-bold text-gold-500 mb-2">
              Harsoyo, S.IP, SH., MKn
            </h2>
            <p className="text-gray-400">Notaris & PPAT Tegal, Jawa Tengah</p>
            <p className="text-gray-400 mt-2">Melayani dengan profesionalisme dan integritas</p>
            <p className="text-gray-400 mt-2">
              JL. Hasyim Dirjo Subroto Desa Wangandawa, Kecamatan Talang, Kabupaten Tegal, Jawa Tengah
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold-500 mb-4">Layanan Kami</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Notaris Tegal</li>
              <li className="text-gray-400">PPAT Tegal</li>
              <li className="text-gray-400">Jasa Notaris Jawa Tengah</li>
              <li className="text-gray-400">Jasa PPAT Jawa Tengah</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold-500 mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Telepon: 085742419333</li>
              <li className="text-gray-400">Email: harsoyo.notaris18@gmail.com</li>
              <li className="text-gray-400">Jam Operasional: Senin-Jum'at, 08:00-16:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Kantor Notaris & PPAT Harsoyo, Tegal, Jawa Tengah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}