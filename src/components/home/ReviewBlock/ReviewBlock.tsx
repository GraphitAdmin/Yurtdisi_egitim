'use client'
import './ReviewBlock.css'
import ReviewImage from "@/assets/home/review.png"
import Image from "next/image"
import {useState} from "react";
const ReviewBlock = () => {
    const [active, setActive] = useState<number>(0);
    const reviews=[
        {
            text:'“Lorem ipsum dolor sit amet consectetur. Elit parturient sit nisl quis tempor nec eget. Rutrum adipiscing hac viverra ultricies at a in. Facilisis a neque nunc ut. Maecenas faucibus malesuada sit pretium viverra molestie mauris cursus ultrices.”',
            image:ReviewImage,
            name:'Amelie Laurent',
            position:'ILS Nottingham'
        },
        {
            text:'“Test Test Test Lorem ipsum dolor sit amet consectetur. Elit parturient sit nisl quis tempor nec eget. Rutrum adipiscing hac viverra ultricies at a in. Facilisis a neque nunc ut. Maecenas faucibus malesuada sit pretium viverra molestie mauris cursus ultrices.”',
            image:ReviewImage,
            name:'Abraham Laurent',
            position:'ILS Forrest'
        },
        {
            text:'“Test Test Lorem ipsum dolor sit amet consectetur. Elit parturient sit nisl quis tempor nec eget. Rutrum adipiscing hac viverra ultricies at a in. Facilisis a neque nunc ut. Maecenas faucibus malesuada sit pretium viverra molestie mauris cursus ultrices.”',
            image:ReviewImage,
            name:'Amelie Raise',
            position:'IBM Integration'
        },
        {
            text:'“Lorem ipsum dolor sit amet consectetur. Elit parturient sit nisl quis tempor nec eget. Rutrum adipiscing hac viverra ultricies at a in. Facilisis a neque nunc ut. Maecenas faucibus malesuada sit pretium viverra molestie mauris cursus ultrices.”',
            image:ReviewImage,
            name:'Ivan Ivanko',
            position:'College Alpin'
        }
    ]
  return(
      <div className="review__block">
          <div className="review__block__main">
              <div className="review__block__main__text">
                  <h3>
                      {reviews[active].text}
                  </h3>
                  <div>
                      <h6 style={{color:'white'}}>
                          — {reviews[active].name}
                      </h6>
                      <p>
                          {reviews[active].position}
                      </p>
                  </div>
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems: 'center',gap:12,marginTop:'auto'}}>
                      <span
                          onClick={()=>setActive(0)}
                          className={active === 0 ? 'review__block__main__span__active' : 'review__block__main__span'}/>
                      <span
                          onClick={()=>setActive(1)}
                          className={active === 1 ? 'review__block__main__span__active' : 'review__block__main__span'}/>
                      <span
                          onClick={()=>setActive(2)}
                          className={active === 2 ? 'review__block__main__span__active' : 'review__block__main__span'}/>
                      <span
                          onClick={()=>setActive(3)}
                          className={active === 3 ? 'review__block__main__span__active' : 'review__block__main__span'}/>
                  </div>
              </div>
              <Image src={reviews[active].image} alt="Review schools abroad"/>
          </div>
      </div>
  )
}
export default ReviewBlock;