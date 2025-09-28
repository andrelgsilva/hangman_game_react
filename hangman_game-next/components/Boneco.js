export default function Boneco({ erros = 0, maxErros = 6 }) {
    const show = (n) => erros >= n
    const isDead = erros === maxErros

    return (
        <div className="boneco-container">
            <svg width="200" height="250" viewBox="0 0 200 250" className="boneco-svg">
                {/* Estrutura da Forca */}
                <line x1="10" y1="240" x2="150" y2="240" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
                <line x1="40" y1="240" x2="40" y2="20" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
                <line x1="40" y1="20" x2="120" y2="20" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
                <line x1="120" y1="20" x2="120" y2="40" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
                
                {/* Corda */}
                {erros > 0 && (
                    <line x1="120" y1="40" x2="120" y2="50" stroke="#94a3b8" strokeWidth="3" strokeDasharray="4,2" />
                )}

                {/* Partes do Corpo */}
                {show(1) && <circle cx="120" cy="60" r="18" stroke={isDead ? "#ef4444" : "#1e293b"} strokeWidth="4" fill="none" />}
                {show(2) && <line x1="120" y1="78" x2="120" y2="140" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />}
                {show(3) && <line x1="120" y1="90" x2="95" y2="115" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />}
                {show(4) && <line x1="120" y1="90" x2="145" y2="115" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />}
                {show(5) && <line x1="120" y1="140" x2="100" y2="185" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />}
                {show(6) && <line x1="120" y1="140" x2="140" y2="185" stroke={isDead ? "#ef4444" : "#1e293b"} strokeWidth="4" strokeLinecap="round" />}
                
                {/* Rosto Normal */}
                {show(1) && !isDead && (
                    <>
                        <circle cx="114" cy="58" r="2" fill="#1e293b" />
                        <circle cx="126" cy="58" r="2" fill="#1e293b" />
                        <line x1="114" y1="66" x2="126" y2="66" stroke="#1e293b" strokeWidth="2" />
                    </>
                )}
                
                {/* Rosto Morto */}
                {isDead && (
                    <>
                        <line x1="114" y1="56" x2="118" y2="60" stroke="#ef4444" strokeWidth="2" />
                        <line x1="118" y1="56" x2="114" y2="60" stroke="#ef4444" strokeWidth="2" />
                        <line x1="122" y1="56" x2="126" y2="60" stroke="#ef4444" strokeWidth="2" />
                        <line x1="126" y1="56" x2="122" y2="60" stroke="#ef4444" strokeWidth="2" />
                        <path d="M114 66 Q120 70 126 66" stroke="#ef4444" strokeWidth="2" fill="none" />
                    </>
                )}
            </svg>
        </div>
    )
}