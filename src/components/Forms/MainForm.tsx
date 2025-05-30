import "./mainForm.css";
import DescriptionForm from "./DescriptionForm";
import HeaderForm from "../Forms/HeaderForm";
import GetForm from "./GetForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function MainForm() {
    const showForm = useSelector((state: RootState) => state.form.showForm);
    return (
        <div className="mainFormContainer">
            <DescriptionForm />

            {showForm ? <GetForm /> : <HeaderForm />}
        </div >
    )
}
