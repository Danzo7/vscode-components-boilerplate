[
  {name:"flutter-Stateless",variants:["widgetName"],template:[
    [
      '{{widgetName}sc}.dart',
`import 'package:flutter/material.dart';

class {{widgetName}pc} extends StatelessWidget {
  const {{widgetName}pc}({Key? key}) : super(key: key);
      
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
    `,
    ]
  ]
  }
  ,{name:"flutter-statful",variants:["widgetName"],template:[
    [
'{{widgetName}sc}.dart',
`import 'package:flutter/material.dart';

class {{widgetName}pc} extends StatefulWidget {
  {{widgetName}pc}({Key? key}) : super(key: key);

  @override
  _{{widgetName}pc}State createState() => _{{widgetName}pc}State();
}

class _{{widgetName}pc}State extends State<{{widgetName}pc}> {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
    `,
    ]
  ]
  }

];