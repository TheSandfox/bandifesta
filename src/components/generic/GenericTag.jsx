import './generictag.css'

export default function GenericTag({variation,children}) {
	return <div className={`genericTag fontMain var${parseInt(variation)}`}>
		{children}
	</div>
}