
import Image from 'next/image'

export default function Logo() {
    return (
        <div className="flex items-center justify-center gap-2">
            <Image src="https://www.heptacom.de/resources/img/logo/Heptacom-Signet.svg" alt="logo" width={40}
                height={40} />
            <span className="text-sm font-semibold">HEPTACOM</span>
        </div>
    );
}