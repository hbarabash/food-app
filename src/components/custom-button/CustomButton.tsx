import { Button } from "@material-ui/core"

interface CustomButtonProps {
    title: string;
    onClick: () => void;
}

export const CustomButton = ( props: CustomButtonProps ) => {
    const { title, onClick } = props;
    return (
            <Button variant={"contained"} onClick={onClick}>
                {title}</Button>
    )
}

