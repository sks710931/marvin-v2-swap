import { formatEther } from '@ethersproject/units';

export const getFormattedEther = (wei) => {
    const ether = formatEther(wei);
    const temp = ether.split('.');
    return `${temp[0]}.${temp[1].substr(0,4)}`;
}

export const shortenAddress = (address) => {
    const partA = address.substring(0,7);
    const partB = address.substring(address.length -6,address.length -0 );
    return partA + "...." + partB;
}