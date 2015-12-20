<?php
class ProductTest extends SapphireTest
{
    protected static $fixture_file = 'ProductTest.yml';

    public function testGenerateProductJSON()
    {
        $product = $this->objFromFixture('Product', 'apple');
        $this->assertEquals(')]}\','."\xA".'{"title":"Apple","description":"Apples are yum.","image":{"path":"apple.png","title":"Apple"}}', $product->generateProductJSON());
    }
}
