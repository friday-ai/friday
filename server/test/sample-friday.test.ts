describe ('If Friday web app is awesome', () => {
  it('SHOULD return true', () => {
    // Arrange
    const testData: string = 'Friday is awesome !';
    const expected = true;

    // Act
    const actual = testData.includes('awesome');

    // Assert
    expect(expected).toBe(actual);
  });
});
