const myQnaData = {
    inputs: {
        title: '',
        text: '',
        time: '',
        userID : ''
    },
    datas : [{
        idx: 1,
        title: '셔틀버스 문의',
        text: '경복궁까지 셔틀버스는 없나요?',
        time: '2024-06-11',
        userID : '3502010371'
    },{
        idx: 2,
        title: '별빛야행 행사 일정 문의',
        text: '별빛야행 행사 언제 시작하나요?',
        time: '2024-06-11',
        userID : '3502010371'
    },
    {
        idx: 3,
        title: '조선왕릉 중 일부를 공개하지 않는 이유',
        text: '조선왕릉 중 일부를 공개하지 않는 이유가 무엇이고 볼 수 있는 방법이 있는지 궁금합니다.',
        time: '2024-06-11',
        userID : '3502010371'
    },
    {
        idx: 4,
        title: '궁궐 자원봉사 문의',
        text: '안녕하세요. 궁궐과 왕릉에서 안내해설 자원봉사를 할 수 있는지 궁금합니다.',
        time: '2024-06-11',
        userID : '3502010371'
    },
    {
        idx: 5,
        title: '대장금 장소 문의드립니다.',
        text: '드라마 대장금에서 요리를 했던 장소를 정확하게 알 수 있을까요?',
        time: '2024-06-11',
        userID : '3502010371'
    },
    {
        idx: 6,
        title: '단순 장소 문의드립니다.',
        text: '우리나라에서 최초로 전깃불을 밝혔던 곳이 어디인지 궁금합니다.',
        time: '2024-06-11',
        userID : '3502010371'
    },
    {
        idx: 7,
        title: '해시계(앙부일구) 문의',
        text: '해시계에 대한 자세한 설명과 보는 방법이 알고 싶습니다.',
        time: '2024-06-11',
        userID : '3502010371'
    },
    {
        idx: 8,
        title: '웨딩촬영 문의',
        text: '창경궁에서 웨딩촬영이 가능하다고 들었는데 따로 허가를 받아야 하나요?',
        time: '2024-06-11',
        userID : '3502010371'
    },
    {
        idx: 9,
        title: '궁궐 해설료 문의',
        text: '궁궐안내 해설자가 있나요? 있다면 해설료는 얼마인가요?',
        time: '2024-06-11',
        userID : '3502010371'
    },
    {
        idx: 10,
        title: '관람 소요 시간 문의',
        text: '창경궁 관람 소요시간은 몇시간정도 되나요?',
        time: '2024-06-11',
        userID : '3502010371'
    },
    {
        idx: 11,
        title: '경복궁 문의',
        text: '경복궁은 왜 오랫동안 폐허로 있었나요?',
        time: '2024-06-11',
        userID : '3502010371'
    },
    {
        idx: 12,
        title: '아이디 문의',
        text: '아이디 문의',
        time: '2024-06-11',
        userID : '3502010372'
    },
    {
        idx: 13,
        title: '아이디 문의',
        text: '아이디 문의',
        time: '2024-06-11',
        userID : '3502010372'
    },
    {
        idx: 14,
        title: '아이디 문의',
        text: '아이디 문의',
        time: '2024-06-11',
        userID : '3502010372'
    },
    {
        idx: 15,
        title: '아이디 문의',
        text: '아이디 문의',
        time: '2024-06-11',
        userID : '3502010372'
    }
    ]
}




const reducer = (state, action)=>{
    switch(action.type){
        case "create" : //추가
            return{
                inputs : myQnaData.inputs,
                datas: state.datas.concat(action.datas)
            }
        case "edit" :   //수정
            return{
                ...state,
                datas : state.datas.map((item)=>item.idx === action.idx ? {...item, title:action.title, text:action.text} : item)
            }
        case "remove" :   //삭제
            return{
                ...state,
                datas : state.datas.filter((item)=>item.idx !== action.idx)
            }
        case "search" :   //검색
            return{
                ...state,
                datas: state.datas.filter((item)=>{return(
                    item.title.toLowerCase().includes(action.text.toLowerCase()) ||
                    item.text.toLowerCase().includes(action.text.toLowerCase())
                )})
            }
        default :
            return state
    }
}
export {myQnaData, reducer}