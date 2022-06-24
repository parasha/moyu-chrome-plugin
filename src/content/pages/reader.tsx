import React from 'react';
import { Chapter } from '@/definitions/book';
import style from '../style.module.less';

type IProps = {
    chapter: Chapter
}

const Reader = ({ chapter }: IProps) => {

    return (
        <div id={style["content-container"]}>
            <div className="content" dangerouslySetInnerHTML={{__html: chapter.content || ''}} />
            <div className="content-handle">
                <div className={`btn${chapter.preId ? '' : ' disabled'}`}>
                    上一章
                </div>
                <div className="btn">返回目录</div>
                <div className={`btn${chapter.nextId ? '' : ' disabled'}`}>
                    下一章
                </div>
            </div>
        </div>
    );
}

export default Reader;
