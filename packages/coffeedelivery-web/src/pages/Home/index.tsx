import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react';
import BannerImg from '../../assets/banner.png';
import { Banner, Container, Content, Title } from './styles';
import { COFFEES } from '../../Data/Coffees';
import { CoffeeCard } from '../../components/CoffeeCard';
import { BadgeIcon } from '../../components/BadgeIcon';

export function Home() {
	return (
		<Container>
			<Banner>
				<span>
					<h1>Encontre o café perfeito para qualquer hora do dia</h1>
					<p>
						Com o Coffee Delivery você recebe seu café onde estiver,
						a qualquer hora
					</p>
				</span>
				<ul>
					<li>
						<BadgeIcon variant="yellow">
							<ShoppingCart size={20} weight="fill" />
						</BadgeIcon>
						Compra simples e segura
					</li>
					<li>
						<BadgeIcon variant="dark">
							<Package size={20} weight="fill" />
						</BadgeIcon>
						Embalagem mantém o café intacto
					</li>
					<li>
						<BadgeIcon variant="yellow-dark">
							<Timer size={20} weight="fill" />
						</BadgeIcon>
						Entrega rápida e rastreada
					</li>
					<li>
						<BadgeIcon variant="purple">
							<Coffee size={20} weight="fill" />
						</BadgeIcon>
						O café chega fresquinho até você
					</li>
				</ul>
				<img src={BannerImg} alt="" />
			</Banner>
			<Title>Nossos Cafés</Title>
			<Content>
				{COFFEES.map(c => (
					<CoffeeCard key={c.id} coffee={c} />
				))}
			</Content>
		</Container>
	);
}
