td = [{'name': 'last topic1'},{'name': 'last topic2'}]



def test(name):
    print ('name: ', name)



for topic in td:
    print (topic)
    test(**topic)    


