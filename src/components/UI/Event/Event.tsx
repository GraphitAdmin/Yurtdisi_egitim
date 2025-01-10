import Image from "next/image";
import React from "react";
import './Event.css';
import Link from "next/link";
import Button from "@/components/UI/Button/Button";
import {IEvent} from "@/interfaces/interfaces";
const Event: React.FC<IEvent> = ({imgPost,type, date, time, title, location,link, description}) => {
    return (
        <Link className="articles__post" href={link}>
            <Image className="w-full" src={imgPost} alt="Post"/>
            <small style={{marginTop:12}}>{type}</small>
            <h5 style={{textAlign: 'left',marginTop:8}}>{title}</h5>
            <p style={{textAlign: 'left'}}>{description}</p>
            <svg style={{marginTop:8,marginBottom:8}} xmlns="http://www.w3.org/2000/svg" height="2" viewBox="0 0 381 2" fill="none">
                <path d="M0 1H381" stroke="#E9EAEB"/>
            </svg>
            <div style={{display: 'flex', flexDirection: 'row',gap:12,width:'100%'}}>
                <p style={{
                    color: 'var(--Courses-Base-Black)',
                    fontWeight:600
                }}>{date}</p>
                <p>{time}</p>
                <p style={{
                    color: 'var(--Courses-Base-Black)',
                    fontWeight:600,
                    marginLeft:"auto"
                }}>{location}</p>
            </div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:12,width:'100%',marginTop:16}}>
                <Button label='School details' btnStyle={{width:'100%'}}/>
                <Button label='Book a meeting' btnStyle={{width:'100%'}} secondary={true}/>
            </div>

        </Link>
    )
}
export default Event