﻿export class Example
{
    public constructor (example: any,
                        url: string,
                        method: string,
                        name: string,
                        filename: string,
                        variables: ExampleVariable[],
                        references: string[],
                        operationId: string,
                        methodId: string)
    {
        this.Example = example;
        this.Url = url;
        this.Method = method;
        this.Name = name;
        this.Filename = filename;
        this.Variables = variables;
        this.References = references;
        this.OperationId = operationId;
        this.MethodId = methodId;
    }

    public Method: string;
    public Filename: string;
    public OperationId: string;
    public MethodId: string;
    public Url: string;
    public Name: string;
    public Variables: ExampleVariable[]; 
    public Example: any;
    public References: string[];

    public GetExampleApiVersion(): string
    {
        return this.Example["parameters"]["api-version"];
    }

    public IsExampleLongRunning(): boolean
    {
        var lro: any = null;
        //var method = this.Operations[this._currentOperation].methods[this._currentMethod];
        // XXX - find fix for this
        //method.Extensions.TryGetValue(AutoRest.Extensions.Azure.AzureExtensions.LongRunningExtension, out lro);
        return (lro != null);
    }

    public ExampleHasBody(): boolean
    {
        return (this.GetExampleBody() != null);
    }

    public CloneExampleParameters(): any
    {
        return JSON.parse(JSON.stringify(this.Example["parameters"]));
    }

    public GetExampleBody(): any
    {
        var body: any = null;

        if ((this.Method != "get") && (this.Method != "delete"))
        {
            var props: any  = this.Example["parameters"];

            var bodyName: string = "";

            for (var pp in props)
            {
                var bodyObject: any = props[pp];

                if (typeof bodyObject == 'object')
                {
                    bodyName = pp;
                    break;
                }
            }

            body = this.Example["parameters"][bodyName];
        }

        return body;
    }
}

export class ExampleVariable
{
    public constructor(name: string, value: string, swaggerName: string)
    {
        this.name = name;
        this.value = value;
        this.swaggerName = swaggerName;
    }
    public name: string;
    public value: string;
    public swaggerName: string;
}
