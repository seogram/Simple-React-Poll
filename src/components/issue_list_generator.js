import React, { PropTypes } from 'react'

const issue_list_generator = (props) => {

  console.log(props);

  for (var key in props.contentIssuesByTest ) {
    if (!props.contentIssuesByTest.hasOwnProperty(key))
      continue;
      var arr = props.contentIssuesByTest[key];
      var title = props.contentIssuesByTest[key][0].test;
      props.partialHtml = arr.map((items, i)=>{
           return(
             <tr key={'ph' + i}>
               <td className="col-md-1">
                 <div className="box">
                   <span>{items.count}</span>
                 </div>
               </td>
               <td className="col-md-1">{items.impact.toFixed(2)}</td>
               <td className="col-md-10">{items.message}</td>
             </tr>
           );
});

    var fullHtml = (
    <div key={'fh' + content_issue_list.length}>
      <div className="report-group-header">
        <h4>{title}</h4>
      </div>
      <div className="table-responsive">
        <table className="table ">
            <thead>
              <tr >
                <td >Count</td>
                <td >Imapct</td>
                <td >Rule</td>
              </tr>
            </thead>
            <tbody>
              {partialHtml}
            </tbody>
        </table>
      </div>
    </div>
  )
    props.content_issue_list.push(fullHtml);
  }

  console.log(fullHtml);

  return (
    fullHtml
  )
}

export default issue_list_generator
