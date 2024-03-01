import "../home-components/styles/record.css";

function record({record, title}){
    return <div className="record_Container">
        <div id="text">{title}:</div>
        <div id="text">{record.metric} {record.unit}</div>
        <div id="text">{record.prdate}</div>
    </div>
}

export default record;