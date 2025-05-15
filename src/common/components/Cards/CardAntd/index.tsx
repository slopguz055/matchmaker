import { Avatar, Card, Image } from "antd";
import { FC } from "react";
import {
  InfoCircleOutlined,
  StarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

interface CardAntdProps {
  game: string; // Ahora mismo se pasará un título pero eventualmente será el nombre del juego para extraer la foto
  alt: string;
  src: string; // Eventualmente no hará falta y se sustituirá por game.image o similar directamente de steam
  user: string; // Ahora mismo se pasará una url con una imagen de avatar, pero eventualmente será un usuario para tomar la dirección de su avatar y su nombre
  desc: string;
}

const CardAntd: FC<CardAntdProps> = ({
  game,
  alt,
  src,
  user,
  desc,
}: CardAntdProps) => {
  return (
    <Card
      className="transition-transform duration-200 hover:scale-105"
      style={{ width: 300 }}
      cover={<Image alt={alt} src={src} preview={false} />}
      actions={[
        <InfoCircleOutlined key="info" />,
        <UsergroupAddOutlined key="join" />,
        <StarOutlined key="fav" />,
      ]}
    >
      <Meta avatar={<Avatar src={user} />} title={game} description={desc} />
    </Card>
  );
};
export default CardAntd;
