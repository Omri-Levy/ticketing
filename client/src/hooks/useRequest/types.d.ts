type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

interface Args {
	url: string;
	method: Method;
	body: Record<string | number | symbol, any>;
	onSuccess?: (args?: any) => any;
}

type HookReturns = ({url, method, body}: Args) => ({
	fetch: (props?: Record<string | number | symbol, any>) => Promise;
	errors?: { message: string, field?: string }[];
})


export {HookReturns};
