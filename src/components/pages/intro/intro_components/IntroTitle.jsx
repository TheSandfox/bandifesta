import "./IntroTitle.css";
const IntroTitle = ({introTitle})=>{
	return (
		<div className="IntroTitle">
     		<div className="IntroTitle_box">
        		<div className="IntroTitle_innerbox">
					<div className="IntroTitle_crossbox">
						<p className="IntroTitle_title">{introTitle}</p>
					</div>
				</div>
      		</div>
    	</div>
	)
}
export default IntroTitle