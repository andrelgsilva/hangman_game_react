export default function Palavra({ palavra, tentativas }) {
    return (
        <div className="palavra">
            {palavra.split('').map((l, i) => (
                <span key={i} className={`letter ${tentativas.includes(l) ? 'revealed' : ''}`}>
                    {tentativas.includes(l) ? l : '_'}
                </span>
            ))}
        </div>
    )
}