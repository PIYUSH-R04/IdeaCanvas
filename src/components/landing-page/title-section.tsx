import React from 'react'


interface TitleSectionProps{
    title: string;
    subheading?: string;
    pill: string;
}

const TitleSection:React.FC<TitleSectionProps> = ({title,subheading, pill}) => {
  return (
    <div>TitleSection</div>
  )
}

export default TitleSection;