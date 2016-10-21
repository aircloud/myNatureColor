/**
 * Created by Xiaotao.Nie on 21/10/2016.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */
export function isObjectEmpty (obj)
{
    for(var name
        in obj)
    {
        if(obj.hasOwnProperty(name))
        {
            return false;
        }
    }
    return true;
};