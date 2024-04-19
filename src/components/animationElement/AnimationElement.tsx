import React from 'react'
import styles from './AnimationElement.module.css'


type Animation = {
    link: string;
    name: string;
}


const AnimationElement: React.FC<Animation> = ({link, name}) => {
  return (
      <>
      <img className={styles.cloud} src={link} alt={name} />
      </>
  )
}

export default AnimationElement