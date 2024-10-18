import { Avatar, Flex } from "@radix-ui/themes";

export function Avathar() {
    return (
        <Flex align="center" gap="4">
            {/* <div className="rounded-full xs:w-8 xs:h-8 sm:w-8 sm:h-8 w-8 h-8"> */}
                <div className="rounded-full xs:w-6 xs:h-6 w-7 h-7">
                    <img
                        className="object-cover rounded-full"
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                        alt="Avatar"
                    />
                </div>
        </Flex>

    )
}
