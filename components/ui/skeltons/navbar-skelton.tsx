import { Skeleton } from "@radix-ui/themes";

export default function NavbarSkelton() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto', width: '96vw', height: '40px' }}>
            <Skeleton width="10vw" height="50px" style={{ borderRadius: '5px' }} />
            <Skeleton width="60vw" height="50px" style={{ borderRadius: '5px' }} />
            <Skeleton width="50px" height="50px" style={{ borderRadius: '100%' }} />
        </div>
    )
}
