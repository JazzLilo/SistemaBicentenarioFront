import { User } from "@/components/interface/user"
import { apiService } from "@/services/apiService";

export const save_data = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
}
export const get_data = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

export const update_data = (user: User) => {
    const currentUser = get_data();
    if (currentUser) {
        const updatedUser = { ...currentUser, ...user };
        localStorage.setItem("user", JSON.stringify(updatedUser));
    }
}

export const remove_data = () => {
    const email =  localStorage.getItem("email");
    apiService.post("users/unauthenticate",{
       email
    })
    localStorage.removeItem("user");
    localStorage.removeItem("email");
}