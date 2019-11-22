export const interpretMessageAPI = (json, messageDefault) => {
    let message
    try
    {
        if(json)
        {
            if(json.message)
                message = json.message
            else if(json.msg)
                message = json.msg
        }
    }
    catch(error)
    {
        message = messageDefault
    }
    finally
    {
        if(!message)
            message = messageDefault
    }

    return message
}