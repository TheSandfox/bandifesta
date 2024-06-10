import './gnericbutton.css'

export default function GenericButton({children, onClick}) {
	return <div className="genericButton" onClick={onClick||(()=>{})}>
		<div className="fontMain">
			{children}
		</div>
	</div>
}