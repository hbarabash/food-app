import { Button } from "@material-ui/core"

interface CustomButtonProps {
    title: string;
}

export const CustomButton = ( props: CustomButtonProps ) => {
    const { title } = props;
    return (
            <Button variant={"contained"}>{title}</Button>
    )
}

