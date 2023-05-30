import React from 'react';
import './ui.module.css';
import { RewardItem } from '../../ts/interfaces/Commendation.interface';
import { Text } from "@nextui-org/react"

function ListItem({ imageUrl, name, wikiPageUrl }: RewardItem) {
  return (
    <div>
      <img style={{  
        width: "60%",
        height: "60%",
        display: "block",
        margin: "auto"
      }} src={imageUrl} alt={name} />
      <br />
      <Text size='$md' style={{ textAlign: "center" }}>{name}</Text>
    </div>
  );
}

function ImageList({ images }: { images: RewardItem[] }) {
  return (
    <div>
      {images.map((image, index) => 
        <ListItem 
          key={index}
          imageUrl={image.imageUrl}
          wikiPageUrl={image.wikiPageUrl}
          name={image.name}
        />
      )}
    </div>
  );
}

export default ImageList;