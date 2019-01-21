import React from 'react';

import IssueTimer from '../Timer/IssueTimer';

import './style.css';

const Task = (props) => {
    return (
        <div className="b-task">
            <div className="b-page-title">Task title {props.match.params.issueKey}</div>
            <div className="b-task__description">
                <div className="b-task__btns">
                    <button className="b-btn">Edit</button>
                    <button className="b-btn">Comment</button>
                    <button className="b-btn">Assign</button>
                    <button className="b-btn">Workflow</button>
                </div>
                <div className="b-task__subtitle">Description</div>
                <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mauris risus, feugiat vitae dui id, lacinia convallis augue. Sed dolor mauris, auctor et venenatis in, imperdiet eu quam. Phasellus sodales, est vel hendrerit auctor, turpis mauris egestas odio, eget malesuada ipsum mauris ut nulla. Donec consectetur, mi a interdum iaculis, velit nunc cursus ipsum, id hendrerit ex nisi at sem. Nullam pharetra turpis quis velit condimentum posuere. In accumsan sit amet lacus sit amet convallis. Donec ultricies malesuada odio id molestie. Sed eu finibus ex, eget vestibulum nibh. Morbi in elit mauris. Sed tristique pellentesque dolor, a ullamcorper sem rutrum vitae.
                </p>
                <p>
        Pellentesque ut sapien id lectus interdum tristique. Nam tristique, arcu et gravida mattis, nisi eros sagittis velit, sed scelerisque libero urna quis turpis. Nulla cursus odio maximus ultricies semper. Vivamus eu turpis eu purus vehicula volutpat in nec eros. Ut luctus magna non lectus consequat, ut interdum dolor interdum. Integer interdum lorem ut mattis sagittis. Cras faucibus orci vel tincidunt lobortis. Curabitur turpis est, egestas vel cursus a, placerat ut ante. Nam nulla tellus, euismod id turpis et, porttitor dignissim elit.
                </p>
            </div>
            <div className="b-task__widgets">
                <div className="b-task__subtitle">Issue timer</div>
                <IssueTimer
                    issueId={props.match.params.issueId}
                    issueKey={props.match.params.issueKey}
                />
            </div>
        </div>
    );
};

export default Task;
