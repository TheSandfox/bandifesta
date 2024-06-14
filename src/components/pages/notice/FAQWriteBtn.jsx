export default function FAQWriteBtn({text, link}){
    return<div className="FAQWriteBtn">
        <button>
            <a href={link}>
                {text}
            </a>
        </button>
    </div>
}