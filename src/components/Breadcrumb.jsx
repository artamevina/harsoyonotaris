import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumb() {
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x)

    return (
        <nav className="bg-gray-800 py-3 px-4">
            <div className="max-w-6xl mx-auto">
                <ol className="list-reset flex text-sm text-gray-400">
                    <li>
                        <Link to="/" className="text-gold-500 hover:text-gold-400">
                            Beranda
                        </Link>
                    </li>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`
                        const isLast = index === pathnames.length - 1
                        return (
                            <li key={to} className="flex items-center">
                                <span className="mx-2">/</span>
                                {isLast ? (
                                    <span className="text-white capitalize">{value.replace(/-/g, ' ')}</span>
                                ) : (
                                    <Link to={to} className="text-gold-500 hover:text-gold-400 capitalize">
                                        {value.replace(/-/g, ' ')}
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </div>
        </nav>
    )
}