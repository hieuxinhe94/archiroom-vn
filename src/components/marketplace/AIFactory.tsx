
export class AIConfig {
    name: string;
    shortDescription: string;
    endpoint: string;
    method: "POST" | "GET" | "PUT" ;
    contentType: "JSON"
    body: {} ;
    header: {};
    note: string;
}

export default function AIFactory(id: number, name: string, shortDescription: string, config: AIConfig) {

    const validateInput = () => {
        if (!config) {}
        

        return "";
    }

    const play = () => {

    }

}