const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')


    export default function Teclado({ tentar, tentativas = [], disabled = false }) {
        return (
            <div className="teclado">
                {ALFABETO.map((l) => {
                    const used = tentativas.includes(l)
                    return (
                        <button
                            key={l}
                            className={`key ${used ? 'used' : ''} ${used && tentativas.includes(l) && !tentar ? '' : ''}`}
                            onClick={() => !disabled && !used && tentar(l)}
                            disabled={used || disabled}
                            aria-pressed={used}
                        >
                            {l}
                        </button>
                    )
                })}
            </div>
        )
    }