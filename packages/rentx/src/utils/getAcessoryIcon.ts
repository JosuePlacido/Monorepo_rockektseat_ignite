import ForceSvg from '../assets/force.svg';
import AccelerateSvg from '../assets/acceleration.svg';
import EnergySvg from '../assets/energy.svg';
import PeopleSvg from '../assets/people.svg';
import SpeedSvg from '../assets/speed.svg';
import ExchangeSvg from '../assets/exchange.svg';
import GasolineSvg from '../assets/gasoline.svg';
import HybridSvg from '../assets/hybrid.svg';

const icons = {
	'turning_diameter': ForceSvg,
	'acceleration': AccelerateSvg,
	'electric_motor': EnergySvg,
	'seats': PeopleSvg,
	'speed': SpeedSvg,
	'exchange': ExchangeSvg,
	'gasoline_motor': GasolineSvg,
	'hybrid_motor': HybridSvg
}
export function getIcon(type: string) {
	return icons[type];
}
